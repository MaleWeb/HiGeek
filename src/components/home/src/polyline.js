export default {
  name: 'uu-polyline',
  data() {
    return {
      PolyLine: null,
      events: [
        'click',
        'dblclick',
        'mousedown',
        'mouseup',
        'mouseout',
        'mouseover',
        'remove',
        'lineupdate',
      ],
    };
  },
  methods: {
    // 添加折线图
    addPolyLine() {
      let points;
      if (this.points.length) {
        points = this.points.map(point => new BMap.Point(point.lng, point.lat));
      } else {
        points = this.points.points.map(
          point => new BMap.Point(point.lng, point.lat),
        );
      }
      this.PolyLine = new BMap.Polyline(points, this.options);
      this.points.PolyLine = this.PolyLine;
      if (this.setIcon) {
        this.PolyLine.setIcon(this.setIcon);
      }
      if (this.map) {
        this.map.addOverlay(this.PolyLine);
        this.$emit('addOverlay', this.PolyLine);
        this.initEvent();
        this.initPolyLine();
      }
    },
    // 初始化 窗口 事件
    initPolyLine() {
      if (this.openInfoWindow) {
        this.PolyLine.openInfoWindow(this.openInfoWindow);
      }
      if (this.closeInfoWindow) {
        this.PolyLine.closeInfoWindow(this.closeInfoWindow);
      }
      if (this.enableDragging) {
        this.PolyLine.enableDragging();
      }
    },
    // event事件
    initEvent() {
      this.events.map(event => {
        this.PolyLine.addEventListener(event, e => {
          e.PolyLine = this.PolyLine;
          e._key = this._key;
          this.$emit('on-' + event, e);
        });
      });
    },
    // 设置先坐标集合
    setPath(arr) {
      let points = arr.map(point => new BMap.Point(point.lng, point.lat));
      if (this.PolyLine) {
        this.PolyLine.setPath(points);
      }
    },
  },
  props: {
    map: Object, // 地图实例
    points: [Array, Object], // 组成线的点集合对象
    options: Object,
    openInfoWindow: Object,
    setOffset: Object,
    enableDragging: Boolean,
    _key: Number,
  },
  mounted() {
    this.$nextTick(() => {
      this.map = this.$parent.map;
      this.addPolyLine();
    });
  },
  render(h) {
    return h('');
  },
};
