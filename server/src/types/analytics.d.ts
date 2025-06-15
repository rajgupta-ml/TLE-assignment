export type CodeforcesSubmission = {
    id: number;
    contestId: number;
    creationTimeSeconds: number;
    relativeTimeSeconds: number;
    problem: {
        contestId: number;
        index: string;
        name: string;
        type: string;
        points: number;
        rating: number;
        tags: string[];
    };
    author: {
        contestId: number;
        participantId: number;
        members: {
            handle: string;
        }[];
        participantType: string;
        ghost: boolean;
        startTimeSeconds: number;
    };
    programmingLanguage: string;
    verdict: string;
    testset: string;
    passedTestCount: number;
    timeConsumedMillis: number;
    memoryConsumedBytes: number;
};


export type IContestData = {
    contestId : number,
    contestName : string,
    handle : string,
    rank : number,
    ratingUpdateTimeSeconds : number,
    oldRating : number,
    newRating : number,
}

export type ResponseContestData = {
    contestId : number,
    date : string,
    rating : number,
    contest : string,
    rank : number,
    unsolved : number
}

export type Bucket = {
    range : string,
    count : number,
    color : string
}

export type ResponseProblemData = {
    mostDifficult : {name : string, rating : number};
    totalSolved : number,
    averageRating : number,
    averagePerDay : number,
    ratingDistribution : Bucket[];    
}

export type userMetrics = {
    currentRating : number,
    maxRating : number,
    consitency : number
    highestImporovement : number
    inActive : boolean
    status : string
}

export interface studentAnalytics {
    userMetrics : userMetrics,
    contestMetrics : Record<string, ResponseContestData[]>,
    problemMetrics : Record<string,ResponseProblemData>,
}
