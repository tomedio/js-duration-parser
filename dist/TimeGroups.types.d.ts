/**
 * An interface that represents a group of time data.
 */
export interface TimeGroup {
    /**
     * The unit of time, such as "hour" or "second".
     */
    unit?: string;
    /**
     * The amount of time, in the units specified by `unit`.
     */
    time?: number;
}
