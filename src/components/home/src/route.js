export default {
  name: 'uu-route',
  data() {
    return {
      Route: null,
      pointsArr: [],
      option: {},
    };
  },
  props: {
    map: Object,
    route: Object,
    type: String,
    _key: Number,
    options: Object,
  },
  created() {
    if (this.map) {
      this.initRoute();
    }
  },
  methods: {
    coverOptions() {
      this.option = this.options || {};
      this.option.renderOptions = {
        map: this.map,
        autoViewport: true,
      };
    },
    // 初始化路书
    initRoute() {
      let points = this.coverPoints(this.route.points);
      let type = this.type || 'Riding';
      this.coverOptions();
      this.route.Route = this['draw' + type](points);
    },
    // 处理路书点集合
    coverPoints(points) {
      if (!points.length) {
        return [];
      }
      return points.map(item => {
        return new BMap.Point(item.lng, item.lat);
      });
    },
    // 处理骑行路书
    drawRiding(points) {
      let router = new BMap.RidingRoute(this.map, this.option);
      router.search(points[0], points[1]);
      return router;
    },
    // 处理步行路书
    drawWalking(points) {
      let router = new BMap.WalkingRoute(this.map, this.option);
      router.search(points[0], points[1]);
      return router;
    },
    // 处理开车路书
    drawDriving(points) {
      let router = new BMap.DrivingRoute(this.map, this.option);
      router.search(points[0], points[1]);
      return router;
    },
  },
  watch: {
    map(value) {
      if (value) {
        this.initRoute();
      }
    },
  },
  render(h) {
    return h('');
  },
};
