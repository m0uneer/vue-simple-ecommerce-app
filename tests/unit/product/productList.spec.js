import { shallowMount, flushPromises } from '@vue/test-utils';
import ApiService from '@/services/shared/ApiService';

import ProductList from '@/components/product/ProductList.vue';
import store from '@/store';
import ProductFixtures from './productFixtures';

jest.mock('@/services/shared/ApiService');
const mockedApiService = jest.mocked(ApiService);

const mockedData = Promise.resolve({ data: { data: ProductFixtures.getProductList() } });
const mockedUser = Promise.resolve({ data: { data: ProductFixtures.getUser() } });

describe('ProductList', () => {
  it('should list products properly', async () => {
    // login
    mockedApiService.post.mockReturnValueOnce(mockedUser);
    await store.dispatch('login', {});

    mockedApiService.get.mockReturnValueOnce(mockedData);
    const wrapper = shallowMount(ProductList, {
      global: { mocks: { $store: store, $router: { push: jest.fn() } } },
    });

    expect(mockedApiService.get).toBeCalledWith('/products');

    await flushPromises();
    expect(wrapper.vm.productItems.length).toBe(4);
  });
});
