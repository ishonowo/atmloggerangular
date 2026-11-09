export interface LoggedCallObj{
    logId: number;
    branchName: string;
    terminalId: string;
    terminalName: string;
    vendorName: string;
    issueDesc: string;
    dateLogged: Date;
    branchLogger: string;
    loggerPhone: string;
    startingDate: Date;
    dateCompleted: Date;
    statusDesc: string;
    statusId: number;

    loggerEmail: string;
    loggerBrowserUsed: string;
    loggerHostName: string;
    loggerIP: string;
    
    closerEmail: string;
    closerBrowserUsed: string;
    closerHostName: string;
    closerIP: string;
    
    reopenerEmail: string;
    reopenerBrowserUsed: string;
    reopenerHostName: string;
    reopenerIP: string;
    

    // SLA fields
    holdStart?: Date | null;
    holdEnd?: Date | null;
    allowedHours?: number;
    slaDeadline?: Date;
    slaBreached?: boolean;
}
