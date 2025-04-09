<template>
  <div class="page">
    <div class="flowchart-toolbar">
      <button @click="addNode">添加节点</button>
      <button @click="editNode">编辑节点</button>
      <button @click="saveFlowchart">导出JSON</button>
      <select v-model="selectedLinkStyle" @change="updateLinkStyle">
        <option value="">默认连线</option>
        <option value="Bezier">贝塞尔曲线</option>
        <option value="Orthogonal">正交线</option>
      </select>
    </div>
    <div id="flowchart" ref="flowchart"></div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import * as go from 'gojs'

const selectedLinkStyle = ref('')

const flowchart = ref<HTMLDivElement | null>(null)
const diagram = ref<go.Diagram | null>(null)

onMounted(() => {
  if (!flowchart.value) return
  
  const $ = go.GraphObject.make
  diagram.value = $(go.Diagram, flowchart.value, {
    'undoManager.isEnabled': true,
    'clickCreatingTool.archetypeNodeData': { text: '新节点' },
    'draggingTool.dragsLink': true,
    'linkingTool.isUnconnectedLinkValid': true,
    'linkingTool.portGravity': 20
  })

  diagram.value.nodeTemplate =
    $(go.Node, 'Auto',
      new go.Binding('shape', 'type', type => {
        switch(type) {
          case '1': return 'Circle'
          case '2': return 'Ellipse'
          case '3': return 'Diamond'
          default: return 'RoundedRectangle'
        }
      }),
      $(go.Shape, 
        { 
          fill: 'white',
          stroke: '#333',
          strokeWidth: 2
        },
        new go.Binding('figure', 'type', type => {
          switch(type) {
            case '1': return 'Circle'
            case '2': return 'Ellipse'
            case '3': return 'Diamond'
            default: return 'RoundedRectangle'
          }
        })
      ),
      $(go.TextBlock, 
        { 
          margin: 5, 
          font: '12px sans-serif',
          stroke: '#333'
        }, 
        new go.Binding('text', 'text')
      )
    )

  // 定义连接线模板
  diagram.value.linkTemplate =
    $(go.Link,
      { routing: go.Link.Orthogonal, corner: 10 },
      $(go.Shape, { stroke: '#333', strokeWidth: 2 }),
      $(go.Shape, { toArrow: 'Standard', fill: '#333', stroke: null })
    )

  // 定义端口模板，用于节点连接
  diagram.value.nodeTemplate.add(
    $(go.Panel, 'Auto',
      $(go.Shape, 'Ellipse', {
        fill: null,
        stroke: null,
        strokeWidth: 0,
        desiredSize: new go.Size(8, 8)
      }),
      $(go.Shape, 'Ellipse', {
        fill: '#424242',
        stroke: null,
        desiredSize: new go.Size(6, 6)
      }),
      new go.Binding('portId', 'key'),
      new go.Binding('alignment', 'type', type => {
        switch(type) {
          case '1': return go.Spot.Bottom;
          case '2': return go.Spot.Top;
          case '3': return go.Spot.Right;
          default: return go.Spot.Bottom;
        }
      })
    )
  );

  diagram.value.model = new go.GraphLinksModel([
    { key: 1, text: '开始', type: '1' },
    { key: 2, text: '步骤1', type: '4' },
    { key: 3, text: '结束', type: '2' }
  ], [
    { from: 1, to: 2 },
    { from: 2, to: 3 }
  ])
})

const addNode = () => {
  if (!flowchart.value || !diagram.value) return
  
  const nodeType = prompt('选择节点类型:\n1-开始(圆形)\n2-结束(椭圆形)\n3-判断(菱形)\n4-普通(圆角矩形)', '4')
  if (!nodeType) return
  
  const nodeText = prompt('输入节点文本:', '新节点')
  if (!nodeText) return
  
  const model = diagram.value.model
  const newNode = {
    key: Date.now(), // 使用时间戳作为唯一key
    text: nodeText,
    type: nodeType,
    color: nodeType === '1' ? '#FF6B6B' : 
           nodeType === '2' ? '#4ECDC4' : 
           nodeType === '3' ? '#FFD166' : '#A5D8FF'
  }
  
  model.addNodeData(newNode)
  diagram.value.requestUpdate()
}

const editNode = () => {
  if (!flowchart.value || !diagram.value) return
  
  const selectedNode = diagram.value.selection.first()
  if (!selectedNode) {
    alert('请先选择一个节点')
    return
  }
  
  const nodeData = selectedNode.data
  const newText = prompt('编辑节点文本:', nodeData.text)
  if (newText !== null) {
    diagram.value.model.setDataProperty(nodeData, 'text', newText)
    diagram.value.requestUpdate()
  }
}

const updateLinkStyle = () => {
  if (!flowchart.value || !selectedLinkStyle.value) return
  
  if (!diagram.value) return
  
  diagram.value.linkTemplate =
    $(go.Link,
      {
        routing: selectedLinkStyle.value === 'Bezier' ? go.Link.Bezier : go.Link.Orthogonal,
        corner: 10
      },
      go.GraphObject.make(go.Shape, { stroke: '#333', strokeWidth: 2 }),
      go.GraphObject.make(go.Shape, { toArrow: 'Standard', fill: '#333', stroke: null })
    )
  diagram.value.requestUpdate()
}

const saveFlowchart = () => {
  if (!flowchart.value) return
  
  if (!diagram.value) return
  
  // 导出为JSON
  const json = diagram.value.model.toJson()
  const blob = new Blob([json], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  
  const a = document.createElement('a')
  a.href = url
  a.download = 'flowchart.json'
  a.click()
  
  URL.revokeObjectURL(url)
}
</script>

<style scoped>
.page {
  padding: 20px;
}

#flowchart {
  width: 100%;
  height: 600px;
  border: 1px solid #81c7e2;
  margin-top: 20px;
}

.flowchart-toolbar {
  display: flex;
  gap: 10px;
  margin-bottom: 15px;
  padding: 10px;
  background: #f5f5f5;
  border-radius: 4px;
}

.flowchart-toolbar button {
  padding: 8px 15px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background: white;
  cursor: pointer;
  transition: all 0.2s;
}

.flowchart-toolbar button:hover {
  background: #f0f0f0;
}

.flowchart-toolbar select {
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}
</style>