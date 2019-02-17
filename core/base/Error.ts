export class CheckUpError extends Error {
  location: string;
  jsonStackTraces: Array<any>;

  constructor(
    message: string,
    location: string,
    ...jsonStackTraces: Array<any>
  ){
    super(message);

    this.location = location;
    this.jsonStackTraces = jsonStackTraces;

    Object.setPrototypeOf(this, CheckUpError.prototype);
  }

  display(){
    console.error(this.message);
    this.jsonStackTraces.forEach((trace, index)=>{
      console.log((index + 1) + ".-");
      console.error(trace);
    });
    this.location && console.error("AT " + this.location)
  }
}
