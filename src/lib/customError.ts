class CustomError extends Error {
    public statusCode: number;
    public errorStack?: string[];
    public showError: boolean;
  
    constructor(message: string, statusCode: number, showError?: boolean, errorStack?: string[]) {
      super(message); // Call the base Error class constructor
      this.name = this.constructor.name;
      this.statusCode = statusCode;
      this.showError = showError ?? false;
      this.errorStack = errorStack;
    }
  }
  
  export default CustomError;
  