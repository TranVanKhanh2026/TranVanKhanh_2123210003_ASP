// services/productService.js
import axiosClient from '../api/axiosClient';

const productService = {
    // Lấy tất cả sản phẩm
    getAllProducts: () => {
        return axiosClient.get('/Products');
    },

    // Lấy sản phẩm theo categoryId (nếu có)
    getProducts: (categoryId) => {
        const url = categoryId ? `/Products?categoryId=${categoryId}` : '/Products';
        return axiosClient.get(url);
    }
};

export default productService;