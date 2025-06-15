import axios from "axios";
import type { Bucket, CodeforcesSubmission, IContestData, ResponseContestData, ResponseProblemData, userMetrics } from "../types/analytics";


//Taking too Much time to fetch the data from codeforce API around 4sec
//Solution to implement a Async Feedback 
// For example, Client add an user the frontend add's the user immediatly does not wait for the response. If response errored remove the user else keeep the user

type data = IContestData[] | CodeforcesSubmission[]
export class StatsService { 


    async getData(codeforceHandle : string) : Promise<Record<string, data> | Record<string, any>> {
        try {    
            const startTime = new Date().getTime();
            const contestData = (await axios.get(`https://codeforces.com/api/user.rating?handle=${codeforceHandle}`)).data.result as IContestData[];
            const problemData = (await axios.get(`https://codeforces.com/api/user.status?handle=${codeforceHandle}`)).data.result as CodeforcesSubmission[];
            const endTime = new Date().getTime();

            console.log((endTime - startTime) / 1000);
            return {
                contestData,
                problemData
            }
        } catch (error) {
            console.log(error);
            return {
                success: false,
                error: "Invalid Codeforces handle or unable to fetch data from Codeforces API"
            }
        }
        

    }

    async getStats (duration : number[] = [7,30,90,365], contestData : IContestData[], problemData: CodeforcesSubmission[]) {
        const formatedContestData = this.calculateConstestData(contestData, duration);
        const formatedProblemData = this.calculateProblemData(problemData,duration);
        const averageUnsolved = this.averageUnsolved(problemData, formatedContestData, duration)
        const userMetrics = this.getUserMetrics(contestData, problemData);
        return {
            userMetrics,
            contenstData : averageUnsolved,
            formatedProblemData
        }
    }   

    private getUserMetrics (contests : IContestData[], problemSubmissions : CodeforcesSubmission[]): userMetrics {
        let latestTimeStamp = -1;
        let latestContest = {} as IContestData; 
        let maxRating = 0;
        let highestImprovement = 0;

        if (contests.length > 0) {
            contests.forEach((data: IContestData) => { 
                if (data.ratingUpdateTimeSeconds > latestTimeStamp) {
                    latestTimeStamp = data.ratingUpdateTimeSeconds;
                    latestContest = data;
                }
                maxRating = Math.max(maxRating, data.newRating);
                highestImprovement = Math.max(highestImprovement, (data.newRating - data.oldRating));
            });
        } else {
            latestContest = { // Default values if no contests
                contestId: 0, contestName: "N/A", handle: "", rank: 0,
                ratingUpdateTimeSeconds: 0, oldRating: 0, newRating: 0
            };
        }

        let latestProblemTimestamp = -Infinity;
        let isInactive = true; // Assume inactive by default

        if (problemSubmissions.length > 0) {
            latestProblemTimestamp = problemSubmissions.reduce((maxTs, sub) =>
                Math.max(maxTs, sub.creationTimeSeconds), -Infinity
            );
            const sevenDaysAgoMs = Date.now() - 7 * 24 * 60 * 60 * 1000;
            if (latestProblemTimestamp * 1000 >= sevenDaysAgoMs) {
                isInactive = false;
            }
        }


        const daysWithSolvedProblems = new Set<string>(); // Stores "YYYY-MM-DD" of solved days
        problemSubmissions.forEach(submission => {
            if (submission.verdict === "OK") {
                daysWithSolvedProblems.add(this.unixToDate(submission.creationTimeSeconds));
            }
        });

        let longestSolvedStreakDays = 0;
        let currentStreak = 0;
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Normalize to start of today

        const CONSISTENCY_WINDOW_DAYS = 365;

        for (let i = 0; i < CONSISTENCY_WINDOW_DAYS; i++) {
            const checkDate = new Date(today.getTime() - i * 24 * 60 * 60 * 1000);
            const checkDateString = this.unixToDate(checkDate.getTime() / 1000);

            if (daysWithSolvedProblems.has(checkDateString)) {
                currentStreak++;
            } else {
                longestSolvedStreakDays = Math.max(longestSolvedStreakDays, currentStreak);
                currentStreak = 0; // Reset streak on a missed day
            }
        }
        // Capture the streak if it extends to the very beginning of the window
        longestSolvedStreakDays = Math.max(longestSolvedStreakDays, currentStreak);

        // --- Return Object ---
        return {
            currentRating: latestContest.newRating,
            maxRating: maxRating,
            consitency: longestSolvedStreakDays, // Using the new streak calculation
            highestImporovement: highestImprovement,
            inActive: isInactive,
            status: this.getRankTitle(latestContest.newRating), // Use getRankTitle for status
        };
    }

    private calculateConstestData(contestData: IContestData[], duration : number[]) : Record<string, ResponseContestData[]>{
        const now = Date.now();
        const daysAgo = (days: number) => now - days * 24 * 60 * 60 * 1000;
        const result : Record<string, ResponseContestData[]> = {}
        duration.forEach((day) => {
            result[day.toString()] = [];
        })
    
        contestData.forEach((contest: IContestData) => {
            const timestamp = contest.ratingUpdateTimeSeconds * 1000;
    
            const formattedDate = this.unixToDate(contest.ratingUpdateTimeSeconds);
    
            const data: ResponseContestData = {
                contestId : contest.contestId,
                contest : contest.contestName,
                rank : contest.rank,
                rating : contest.newRating,
                unsolved : 1,
                date : formattedDate,
            };
            
            duration.map((day) => {
                if(timestamp >= daysAgo(day)){
                    result[day]?.push(data);
                }
            })
        });
    
        return result
    }

    private calculateProblemData(userStatus: CodeforcesSubmission[], duration: number[]): Record<string, ResponseProblemData> {
        const now = Date.now();
        const daysAgo = (days: number) => now - days * 24 * 60 * 60 * 1000;
        
        const result: Record<string, ResponseProblemData> = {};

        duration.forEach((day) => {
            result[day.toString()] = {
                mostDifficult: {name : "", rating : 0},
                totalSolved: 0,
                averageRating: 0,
                averagePerDay: 0,
                ratingDistribution: [
                    { range: "800-999", count: 0, color: "#8884d8" },
                    { range: "1000-1199", count: 0, color: "#82ca9d" },
                    { range: "1200-1399", count: 0, color: "#ffc658" },
                    { range: "1400-1599", count: 0, color: "#ff7300" },
                    { range: "1600-1799", count: 0, color: "#8dd1e1" },
                    { range: "1800+", count: 0, color: "#d084d0" },
                ]
            }; 
        });

        duration.forEach((day) => {
            let mostDifficultRating = -Infinity;
            let mostDifficultQuestionName: string = "";
            let rating = 0;
            let problemSolved = 0;
            let totalRating = 0;
            const bucket: Record<string, [number, string]> = { 
                "800-999": [0, "#8884d8"],
                "1000-1199": [0, "#82ca9d"],
                "1200-1399": [0, "#ffc658"],
                "1400-1599": [0, "#ff7300"],
                "1600-1799": [0, "#8dd1e1"],
                "1800+": [0, "#d084d0"],
            };

            const cutoffTime = daysAgo(day);

            userStatus.forEach((data: CodeforcesSubmission) => {
                const timestamp = data.creationTimeSeconds * 1000;

                
                if (timestamp >= cutoffTime) {
                    if (data.verdict === "OK") {
                        if (data.problem.rating > mostDifficultRating) {
                            mostDifficultRating = data.problem.rating;
                            mostDifficultQuestionName = data.problem.name;
                        }

                        
                        if(data.problem.rating !== undefined ) {
                            totalRating += data.problem.rating;
                            rating = data.problem.rating;
                        } 
                        problemSolved++;
                        
                        if (rating >= 800 && rating <= 999) bucket["800-999"]![0]++;
                        else if (rating >= 1000 && rating <= 1199) bucket["1000-1199"]![0]++;
                        else if (rating >= 1200 && rating <= 1399) bucket["1200-1399"]![0]++;
                        else if (rating >= 1400 && rating <= 1599) bucket["1400-1599"]![0]++;
                        else if (rating >= 1600 && rating <= 1799) bucket["1600-1799"]![0]++;
                        else if (rating >= 1800) bucket["1800+"]![0]++;
                    }
                }
            });

            const finalMostDifficultRating = mostDifficultRating === -Infinity ? 0 : mostDifficultRating;
            const finalMostDifficultQuestionName = mostDifficultRating === -Infinity ? "N/A" : mostDifficultQuestionName; // Or an empty string
            
            const difficult = { name: finalMostDifficultQuestionName, rating: finalMostDifficultRating };
            let averageRating = problemSolved > 0  ? totalRating / problemSolved : 0;
            let averagePerDay = problemSolved > 0 ? problemSolved / day : 0; // Correct calculation

            const buildBucket: Bucket[] = [];
            
            Object.entries(bucket).forEach(([range, [count, color]]) => {
                buildBucket.push({
                    range: range,
                    count: count,
                    color: color,
                });
            });

            if (!result[day.toString()]) {
                result[day.toString()] = { mostDifficult: {name : "", rating : 0},
                totalSolved: 0,
                averageRating: 0,
                averagePerDay: 0,
                ratingDistribution: [
                    { range: "800-999", count: 0, color: "#8884d8" },
                    { range: "1000-1199", count: 0, color: "#82ca9d" },
                    { range: "1200-1399", count: 0, color: "#ffc658" },
                    { range: "1400-1599", count: 0, color: "#ff7300" },
                    { range: "1600-1799", count: 0, color: "#8dd1e1" },
                    { range: "1800+", count: 0, color: "#d084d0" },
                ]
            }; 
            }
            
            result[day.toString()] = {
                mostDifficult: difficult,
                totalSolved: problemSolved,
                averageRating: averageRating,
                averagePerDay: averagePerDay,
                ratingDistribution: buildBucket
            };
        });

        return result;
    }

    private averageUnsolved(
        submissions: CodeforcesSubmission[],
        result: Record<string, ResponseContestData[]>,
        duration: number[]
    ): Record<string, ResponseContestData[]> {
        const now = Date.now();
        const daysAgo = (days: number) => now - days * 24 * 60 * 60 * 1000;

        
        
        const submissionsByContest: Record<number, CodeforcesSubmission[]> = {};
        submissions.forEach(sub => {
            if (sub.contestId) { // Only process submissions linked to a contest
                if (!submissionsByContest[sub.contestId]) {
                    submissionsByContest[sub.contestId] = [];
                }
                submissionsByContest[sub.contestId]!.push(sub);
            }
        });


        duration.forEach((day: number) => {
            const dayKey = day.toString();
            const cutoffTime = daysAgo(day);

            
            if (!result[dayKey]) {
                result[dayKey] = [];
                console.warn(`Result for duration ${dayKey} was not pre-initialized. Initializing an empty array.`);
            }

 
            result[dayKey].forEach((contestEntry: ResponseContestData) => {
                
                if (contestEntry.contestId === undefined) {
                    
                    contestEntry.unsolved = 0;
                    return; 
                }

                let unsolvedForThisContest = 0;
                let totalProblemsAttemptedInThisContest = 0; 

                const relevantSubmissions = submissionsByContest[contestEntry.contestId] || [];

                relevantSubmissions.forEach((submission: CodeforcesSubmission) => {
                    const submissionTime = submission.creationTimeSeconds * 1000;

                    
                    if (submissionTime >= cutoffTime) { 
                        totalProblemsAttemptedInThisContest++;

                        if (submission.verdict !== "OK") {
                            unsolvedForThisContest++;
                        }
                    }
                });


                contestEntry.unsolved = unsolvedForThisContest;
            });
        });

        return result;
    }

    private unixToDate(unixTimeStamp: number) {
        const date = new Date(unixTimeStamp * 1000);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // add +1 here
        const year = date.getFullYear();
    
        return `${year}-${month}-${day}`;
    }

    private getRankTitle(rating: number): string {
        if (rating >= 3000) return "Legendary Grandmaster";
        if (rating >= 2600) return "International Grandmaster";
        if (rating >= 2400) return "Grandmaster";
        if (rating >= 2300) return "International Master";
        if (rating >= 2100) return "Master";
        if (rating >= 1900) return "Candidate Master";
        if (rating >= 1600) return "Expert";
        if (rating >= 1400) return "Specialist";
        if (rating >= 1200) return "Pupil";
        if (rating < 1200) return "Newbie";
        return "Unrated";
    }
    
}
