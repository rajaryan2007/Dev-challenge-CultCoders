import { Inngest } from "inngest";


export const inngest = new Inngest({
    id: "truthlens",
    eventKey: process.env.INNGEST_EVENT_KEY,
});