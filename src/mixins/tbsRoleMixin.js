
export default {
  mounted() {

  },
  methods: {
    flattenArray(menu, list = []) {
      menu.forEach(i => {
        list.push(i);
        if (i.children) {
          this.flattenArray(i.children, list);
        }
      });
    },
    getRoleMenus(noCache = false) {
      return new Promise((resolve, reject) => {
        let menu = this.$store.state.permList;
        if (noCache === false && menu && menu.data) {
          resolve(menu);
        } else {
          let res = {
            data: this.sys.role || []
          };
          let list = [];
          this.flattenArray(res.data, list);
          this.$store.commit('initAllMenuArray', list);
          this.$store.commit('initPermList', res);
          resolve(res);
          let getParentIds = (menus, parentsIds) => {
            menus.forEach(i => {
              if (i.children) {
                parentsIds.push(i.id);
                getParentIds(i.children, parentsIds);
              }
            });
          };
          let setParentIds = (menus) => {
            let parentIds = [];
            getParentIds(menus, parentIds);
            this.$store.commit('initMenuParentIds', parentIds);
          };
          setParentIds(res.data);
        }
      });
    }
  }
};
