declare global{
    namespace NodeJS{
        interface ProcessEnv{
            PORT: number;
            EMAIL_SENDER: string;
            PASS: string;
        }
    }
}


export {}