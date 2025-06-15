import axios from "axios";

type User = {
  name: string;
  email: string;
  phone_number: string;
  codeforceHandle: string;
};

function generateRandomPhoneNumber(): string {
  // Let's generate a 10- to 15-digit number, starting with a digit 1-9
  const length = Math.floor(Math.random() * 6) + 10; // 10 to 15 digits
  let phone = (Math.floor(Math.random() * 9) + 1).toString(); // first digit 1-9
  for (let i = 1; i < length; i++) {
    phone += Math.floor(Math.random() * 10).toString();
  }
  return phone;
}

function generateRandomEmail(handle: string): string {
  const domains = ["example.com", "mail.com", "test.org", "cf.dev"];
  const domain = domains[Math.floor(Math.random() * domains.length)];
  return `${handle.toLowerCase()}${Math.floor(Math.random() * 10000)}@${domain}`;
}

async function sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

async function postAllUsers() {
  const users: User[] = [];
  try {
    const ratedUsers = (
      await axios.get(
        "https://codeforces.com/api/user.ratedList?activeOnly=true&includeRetired=false"
      )
    ).data.result.slice(0, 50);

    for (const handleObj of ratedUsers) {
      const handle = handleObj.handle;
      const name = handleObj.handle; // Assuming handle can be used as name
      const phone_number = generateRandomPhoneNumber();
      const email = generateRandomEmail(handle);

      users.push({
        codeforceHandle: handle,
        name: name,
        phone_number,
        email,
      });
    }

    console.log(`Prepared ${users.length} users for posting.`);

    // Post users sequentially with a delay
    for (const user of users) {
        try {
            const response = await axios.post("http://localhost:8080/v1/api/students", user);
            console.log(`Successfully posted user ${user.codeforceHandle}. Response status: ${response.status}`);
        } catch (postError) {
            console.error(`Failed to post user ${user.codeforceHandle}:`, (postError as any).message || postError);
        }
        await sleep(2000); // This will pause execution for 2 seconds before the next user is processed
    }

    console.log("All data processing complete (including delays).");

  } catch (error) {
    console.error("Error occurred:", error);
  }

  // console.log(users); // This will log all users, uncomment if needed
}

postAllUsers();