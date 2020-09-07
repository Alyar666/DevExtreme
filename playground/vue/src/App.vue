<template>
  <div id="app">
      <LightGrid
        key-expr="id"
        :columns="columns"
        :data-source="dataSource"
      >
      </LightGrid>
  </div>
</template>

<script>

import LightGrid from "./artifacts/vue/renovation/ui/light_grid/light_grid";


let s = 123456789;
const random = function() {
  s = (1103515245 * s + 12345) % 2147483647;
  return s % (10 - 1);
};

const generateData = function(count) {
  var i;
  var surnames = ['Smith', 'Johnson', 'Brown', 'Taylor', 'Anderson', 'Harris', 'Clark', 'Allen', 'Scott', 'Carter'];
  var names = ['James', 'John', 'Robert', 'Christopher', 'George', 'Mary', 'Nancy', 'Sandra', 'Michelle', 'Betty'];
  var gender = ['Male', 'Female'];
  var items = [];

  for (i = 0; i < count; i++) {

    var nameIndex = random();
    var item = {
      id: i + 1,
      firstName: names[nameIndex],
      lastName: surnames[random()],
      gender: gender[Math.floor(nameIndex / 5)]
    };
    items.push(item);
  }
  return items;
};

export default {
  name: 'App',
  components: {
      LightGrid
  },
  data() {
    return {
      columns: ['id', 'firstName', 'lastName', 'gender', 'id', 'firstName', 'lastName', 'gender', 'id', 'firstName', 'lastName', 'gender'],
      dataSource: generateData(100000)
    }
  },
  methods: {
  }
}
</script>


<style lang="scss">
@import url(./artifacts/css/dx.common.css);
@import url(./artifacts/css/dx.light.css);
</style>

