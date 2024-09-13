// import { useState } from 'react'
import './nav.css'

function Nav() {
  // const [count, setCount] = useState(0)
  return (
    <nav>
      <div>select tree</div>
      {/* <div className="dropdown">
        专案选择
        <div className="dropdown-content" id="trackingInfo"></div>
      </div> */}
      <div className="dropdown pointer" onClick={back2home}>返回</div>
    </nav>
  )
}

function back2home() {
  if (window.history.length > 1) {
    window.history.back();
  } else {
    window.close();
  }
}

export default Nav