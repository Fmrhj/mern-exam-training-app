import Loader from 'react-loader-spinner'
import { usePromiseTracker } from 'react-promise-tracker'

const LoadingTracker = (props) => {
  const { promiseInProgress } = usePromiseTracker()

  return (
    promiseInProgress && (
      <div
        style={{
          width: '100%',
          height: '100',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Loader type="ThreeDots" color="blue" height="100" width="100" />
      </div>
    )
  )
}

export default LoadingTracker
