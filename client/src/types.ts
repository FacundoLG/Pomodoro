export interface Preset {
    id?: number | string
    user_id?: number | string
    local_id?: number | string
    name: string
    pomodoro_time: number
    short_break_time: number
    long_break_time: number
    shorts_per_long: number
}