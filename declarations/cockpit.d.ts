export declare module cockpit {
  declare function file(path: string): File;
  declare class File {
    watch(callback: (content: string) => void): void;
  }


  // Spawn processes
  declare function spawn(args: string | string[], options?: SpawnProcessOptions): SpawnProcess;

  declare interface SpawnProcessOptions {
    binary?: boolean;
    directory?: string;
    host?: string;
    environ?: string[];
    err?: "out" | "ignore" | "message" | "pty";
    superuser?: "require" | "try";
  }

  declare interface SpawnProcess extends Promise<string> {
    
  }
}