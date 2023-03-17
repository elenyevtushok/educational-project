import React from 'react'

export const ErrorFallback = ({ error }) => {
  return (
	  <div role="alert">
		  <p>Something went wrong:</p>
		  <pre>{error}</pre>
		  {/* <button onClick={resetErrorBoundary}>Try again</button> */}
	  </div>
  )
}
