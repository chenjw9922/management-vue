<template>
  <div class="page">
    <div ref="barChartRef" class="chart-container"></div>
    <div ref="lineChartRef" class="chart-container"></div>
    <div ref="pieChartRef" class="chart-container"></div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import * as echarts from 'echarts'

const barChartRef = ref<HTMLElement>()
const lineChartRef = ref<HTMLElement>()
const pieChartRef = ref<HTMLElement>()

onMounted(() => {
  if (!barChartRef.value || !lineChartRef.value || !pieChartRef.value) return
  
  // 柱状图
  const barChart = echarts.init(barChartRef.value)
  barChart.setOption({
    grid: {
      top: '15%',
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    title: {
      text: '销量统计'
    },
    tooltip: {},
    xAxis: {
      data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
    },
    yAxis: {},
    series: [
      {
        name: '销量',
        type: 'bar',
        data: [5, 20, 36, 10, 10, 20]
      }
    ]
  })
  
  // 折线图
  const lineChart = echarts.init(lineChartRef.value)
  lineChart.setOption({
    grid: {
      top: '15%',
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    title: {
      text: '销售额统计'
    },
    tooltip: {},
    xAxis: {
      data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
    },
    yAxis: {},
    series: [
      {
        name: '销售额',
        type: 'line',
        data: [150, 600, 1080, 300, 400, 600]
      }
    ]
  })
  
  // 饼图
  const pieChart = echarts.init(pieChartRef.value)
  pieChart.setOption({
    title: {
      text: '销售占比'
    },
    tooltip: {},
    series: [
      {
        name: '占比',
        type: 'pie',
        radius: ['40%', '70%'],
        data: [
          { value: 5, name: '衬衫' },
          { value: 20, name: '羊毛衫' },
          { value: 36, name: '雪纺衫' },
          { value: 10, name: '裤子' },
          { value: 10, name: '高跟鞋' },
          { value: 20, name: '袜子' }
        ],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  })
  
  window.addEventListener('resize', () => {
    barChart.resize()
    lineChart.resize()
    pieChart.resize()
  })
})
</script>

<style scoped>
.page {
  padding: 20px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}

.chart-container {
  width: 100%;
  height: 300px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 15px;
}
</style>