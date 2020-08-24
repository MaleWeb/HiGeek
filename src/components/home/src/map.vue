<template>
<div style="width: 100%; height: 100%;">
    <div class="uu-map" ref="map">
        <slot></slot>
    </div>
</div>
    
</template>

<script>
export default {
    data () {
        return {
            map: null,
            geolocation: null,
            geoType: 'browser',
        }
    },
    methods: {
        // 定位地址
        geoAddress () {
            let that = this;
            try {
                this.geolocation.getCurrentPosition(function (r) {
                    if(this.getStatus() == BMAP_STATUS_SUCCESS){
                        let mk = new BMap.Marker(r.point);
                        that.map.centerAndZoom(r.point, 13);
                    }
                })
            } catch (e) {
                this.geoType = 'ip';
                that.geolocation = new BMap.LocalCity();
                that.geolocation.get(function (result) {
                    let cityName = this.result.name;
                    that.map.centerAndZoom(cityName, 13);
                })
                
            }
        },
        // 初始化地图和位置
        init () {
            if (!this.map) {
                this.map = new BMap.Map(this.$refs.map, {enableMapClick: this.enableMapClick || false});
                this.geolocation = new BMap.Geolocation();
            }
            this.map.enableScrollWheelZoom(this.scroll);
            let that = this;
            if (!this.center) {
                this.geoAddress();
            } else {
                if (this.center === 'string') {
                    this.map.centerAndZoom(this.center, 13);
                } else {
                    let point = new BMap.Point(this.center.lng, this.center.lat);
                    this.map.centerAndZoom(point, 13);
                }
                this.$emit('init-map', this.map);
            }
        },
    },
    mounted () {
        this.init();
    },
    props: {
        center: [String, Object],
        centerCity: String,
        scroll: {
            type: [Boolean],
            default: true
        }
    },
    computed: {

    },
    watch: {
        center (value) {
            if (!value) return;
            this.init();
        }
    }
}
</script>

<style scoped>
.uu-map {
    width: 100%;
    height: 100%;
}
</style>
