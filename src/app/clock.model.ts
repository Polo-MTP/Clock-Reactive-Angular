export class ClockModel {
  public id: string;
  
  constructor(public hours: number, public minutes: number, public seconds: number) {
    this.id = Math.random().toString(36).substr(2, 9);
  }

  public adjustTime(seconds: number) {
    const date = new Date(0, 0, 0, this.hours, this.minutes, this.seconds + seconds);
    this.hours = date.getHours();
    this.minutes = date.getMinutes();
    this.seconds = date.getSeconds();
  }
}

