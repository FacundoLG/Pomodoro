export interface Preset {
    id?: number
    user_id?: number 
    name: string
    pomodoro_time: number
    short_break_time: number
    long_break_time: number
    shorts_per_long: number
}