import { shallowMount } from '@vue/test-utils';

import ProductAdd from '@/components/product/ProductAdd.vue';
import store from '@/store';

describe('ProductAdd', () => {
  const wrapper = shallowMount(ProductAdd, {
    global: {
      mocks: {
        $store: store,
        $router: { push: jest.fn() },
      },
    },
  });

  it('should have core component options', () => {
    expect(typeof ProductAdd.setup).toBe('function');
    expect(typeof ProductAdd.computed).toBe('object');
    expect(typeof ProductAdd.mounted).toBe('function');
    expect(typeof ProductAdd.methods).toBe('object');
  });

  test('should be wrapped properly', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('should render the correct markup', () => {
    const html = wrapper.html();
    expect(html).toMatch(/Add new product(.|\n)*Name(.|\n)*Category/);
    expect(html).toMatch(/Image(.|\n)*Price(.|\n)*Quantity(.|\n)*Discount/);
  });

  it('should has a submit button', () => {
    expect(wrapper.find('button').exists()).toBe(true);
  });
});
