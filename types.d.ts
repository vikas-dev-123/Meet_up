/* eslint-disable no-var */

import { Connection } from "mongoose";

declare global {
    var mongoose: {
        conn: Connection | null;
        promise: Promise<Connection> | null;
    };
}

export {}; // Ensure it's treated as a module
