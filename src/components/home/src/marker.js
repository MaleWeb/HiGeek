export default {
  name: 'uu-marker',
  data() {
    return {
      Marker: null,
      events: [
        'click',
        'mouseover',
        'mouseout',
        'dblclick',
        'mouseup',
        'mousedown',
        'infowindowclose',
        'infowindowopen',
        'remove',
        'dragstart',
        'dragging',
        'dragend',
        'rightclick',
      ],
    };
  },
  methods: {
    // 添加标记
    addMarker() {
      let point = new BMap.Point(this.point.lng, this.point.lat);
      this.Marker = new BMap.Marker(point, this.options);
      this.point.Marker = this.Marker;
      if (this.setIcon) {
        this.Marker.setIcon(this.setIcon);
      }
      if (this.map) {
        this.map.addOverlay(this.Marker);
        this.$emit('addOverlay', this.Marker);
        this.initEvent();
      }
    },
    // 初始化marker 事件
    initMarker() {
      if (this.openInfoWindow) {
        this.Marker.openInfoWindow(this.openInfoWindow);
      }
      if (this.closeInfoWindow) {
        this.Marker.closeInfoWindow(this.closeInfoWindow);
      }
      if (this.enableDragging) {
        this.Marker.enableDragging();
      }
    },
    // 初始化事件绑定
    initEvent() {
      this.events.map(event => {
        this.Marker.addEventListener(event, e => {
          e.Marker = this.Marker;
          e._key = this._key;
          this.$emit('on-' + event, e);
        });
      });
    },
    // 获取线的坐标集合
    getPath() {
      return this.Marker.getPath();
    },
  },
  props: {
    map: Object,
    point: Object,
    options: Object,
    openInfoWindow: Object,
    setOffset: Object,
    enableDragging: Boolean,
    clear: Boolean,
    _key: Number,
  },
  mounted() {
    if (this.map) {
      this.addMarker();
    }
  },
  watch: {
    clear(value) {
      if (!value && this.Marker) {
        this.map.clearOverlay(this.Marker);
      }
    },
    map(value) {
      if (value) {
        this.addMarker();
      }
    },
  },
  render(h) {
    return h('');
  },
};
