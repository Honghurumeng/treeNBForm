import Nav from './components/nav/nav.jsx'
import SelectTree from './components/select_tree/select_tree.jsx'

function App() {
  // 0: blank, 1: select, 2: input, 3: delete
  var treeInfo = [
    [1, 2, 2, 1, 2, 3],
    [0, 1, 2, 1, 2, 3],
  ]
  return (
    <>
      <Nav />
      <SelectTree treeInfo={treeInfo} />
    </>
  )
}

export default App
