export class SignUpError extends Error {
    constructor(
      public code:
        | "INVALID_EMAIL"
        | "EMAIL_EXISTS"
        | "WEAK_PASSWORD"
        | "MISSING_FIELDS",
      message: string
    ) {
      super(message);
      this.name = "SignUpError";
    }
  }
  