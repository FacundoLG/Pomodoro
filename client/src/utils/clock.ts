interface MinutesAndSecs {
    minutes: number,
    seconds: number
}  
export function fix_one_digit (num:number): string {
      if (num >= 0 && num < 10){
          return "0"+(num.toString()) 
        }
        return num.toString()
    }
export function sec_with_minutes(sec: number): MinutesAndSecs{
        const minutes = Math.floor(sec / 60)
        const seconds = sec - 60 * minutes
        return {
            minutes,
            seconds
        }
    }
export function calculate_percentage(sec:number,objective:number){
        const percentage = sec/ ((objective) / 100)
        return percentage
    }
