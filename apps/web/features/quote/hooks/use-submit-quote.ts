import { useMutation } from "@tanstack/react-query"

import { submitQuote } from "../api/submit-quote"

export function useSubmitQuote() {
  return useMutation({ mutationFn: submitQuote })
}
