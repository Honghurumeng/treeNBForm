# treeNBForm

## 示例

<img src="./src/assets/截屏2024-09-13 14.19.29.png">

## 使用方法

```jsx
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
```

## 优化

可以将treeInfo升级为三维数组，增加更多的数据操作，可以复制value和开关option button。