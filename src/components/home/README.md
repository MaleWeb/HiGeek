


## 使用示例
    
```
    <template>
  <div class="home" v-demo="name">
    <div class="map">
      <u-map :center="{lng: 116.331398, lat: 39.897445}" ref="map" @init-map="initMap">
        <u-marker :map="map" :point="item" :_key="index" v-for="item, index in points" @on-click="clickPoint" :key="Date.now() + index"></u-marker>
        <u-polyline :map="map" :points="polyLine" @on-click="clickPolyline"></u-polyline>
        <u-route :map="map" :route="{points: [{lng: 116.331398, lat: 39.897445},{lng: 115.331398, lat: 39.897445}]}" type="Walking"></u-route>
      </u-map>
    </div>
  </div>
</template>

<script>
import { UMap, UMarker, UPolyline, URoute } from '@/components/map';
export default {
  name: 'Home',
  components: {
    UMap,
    UMarker,
    UPolyline,
    URoute
  },
  data () {
    return {
      name: true,
      points: [
        {lng: 116.431398, lat: 39.897445},
        {lng: 117.431398, lat: 39.897445},
        {lng: 114.431398, lat: 39.897445},
        {lng: 115.431398, lat: 39.897445},
      ],
      polyLine: {
        points: [
          {lng: 116.331398, lat: 39.897445},
          {lng: 117.331398, lat: 39.897445},
          {lng: 114.331398, lat: 39.797445},
          {lng: 115.331398, lat: 39.897445},
        ]
      },
      map: null,
    }
  },
  mounted() {
  },
  methods: {
    // 点击线
    clickPolyline (e) {
      console.log(e);
    },
    initMap (map) {
      this.map = map;
    },
    clickPoint (e) {
      // console.log(e);
      let key = e._key;
      this.map.clearOverlays();
      this.points.splice(key, 1);
    }
  }
};
</script>

<style lang="less" scoped>
.map {
  width: 100%;
  height: 500px;
}
</style>
```


###  UMap
##### PROPS
name | 值类型 | 默认值
-|-|-
center | Object  | 中心点坐标  默认 无
scroll | Boolean | 滚轮是否缩放  默认  true

##### event 

name | 参数 | 其他
-|-|-
init-map | 地图初始化完成，参数百度地图实例 BMap | 暂无

###  UMarker
##### props

name | 类型 | 其他
-|-|-
map | Object | 百度地图实例
point | Object { points: [{lng: 111.1111, lat: 122.2222}]} | 坐标点
options | Object | 百度地图marker实例options参数
_key | Number | v-for中使用，对应的下标

##### event

name | 参数 | 其他
-|-|-
on-click | event{type, target, Maker, _key} | _key v-for 中对应数组下标（需要传进来）；Marker 百度地图Marker实列
on-mouseover | event{type, target, point,pixel, Maker, _key} | 
on-mouseout | event{type, target, point,pixel, Maker, _key} | 
on-dblclick | event{type, target, point,pixel， Maker, _key} | 
on-mouseup | event{type, target, point,pixel, Maker, _key} | 
on-mousedown | event{type, target, point,pixel， Maker, _key} | 
on-infowindowclose | event{type, target, Maker, _key} | 
on-infowindowopen | event{type, target, Maker, _key} | 
on-remove | event{type, target, Maker, _key} | 
on-dragstart | event{type, target, Maker, _key} | 
on-dragging | event{type, target, pixel, point, Maker, _key} | 
on-dragend | event{type, target, pixel, point, Maker, _key} | 
on-rightclick | event{type, target, Maker, _key} | 

### UPolyline

##### props

name | 类型 | 其他
-|-|-
map | Object | 百度地图实例
point | Object { points: [{lng: 111.1111, lat: 122.2222}]} | 坐标点
options | Object | 百度地图marker实例options参数
_key | Number | v-for中使用，对应的下标

##### event

name | 参数 | 其他
-|-|-
on-click | event{type, target, point, pixel, Maker, _key} | _key v-for 中对应数组下标（需要传进来）；Marker 百度地图Marker实列
on-mouseover | event{type, target, point,pixel, Maker, _key} | 
on-mouseout | event{type, target, point,pixel, Maker, _key} | 
on-dblclick | event{type, target, point,pixel， Maker, _key} | 
on-mouseup | event{type, target, point,pixel, Maker, _key} | 
on-mousedown | event{type, target, point,pixel， Maker, _key} | 
on-lineupdate | event{type, target, Maker, _key} | 
on-remove | event{type, target, Maker, _key} | 


### URoute 

##### props

name | 参数 | 其他
-|-|-
map | Object | 百度地图实例
route | Object { points: [{lng: 111.1111, lat: 122.2222}]} | 坐标点
options | Object | 百度地图marker实例options参数
_key | Number | v-for中使用，对应的下标
type | String | 路书类型： Riding|Driving|Walking。  默认:  Riding

    
    
  


