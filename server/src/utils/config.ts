function requireEnv(key: string): string {
    const val = process.env[key];
    if (!val) throw new Error(`${key} is required.`);
    return val;
  }
  
  export const config = {
    server: {
      PORT: requireEnv("PORT"),
    },
    db : {
        URI : requireEnv("MONGO_DB_URI")
    }
  }
  