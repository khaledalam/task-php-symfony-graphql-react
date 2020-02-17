import React, {Component} from 'react';
import axios from 'axios';

class GetProducts extends Component {
    constructor() {
        super();
        this.state = { products: [], lastCount: 5, loading: true};
    }

    componentDidMount() {
        this.getProducts();
    }

    getProducts() {
        axios.get(`/api/get/products`).then(products => {
            this.setState({ products: products.data, loading: false});
        })
    }

    handleChangeLimit(increase) {
        let newLimit = this.state.lastCount + (increase ? 5 : -5);
        this.setState({ lastCount: newLimit});
    }

    render() {
        const { products, loading, lastCount } = this.state;

        return(
            <div className="container">
                {loading ? (
                    <div className={'row text-center'}>
                        <span className="fa fa-spin fa-spinner fa-3x"></span>
                    </div>
                ) : (
                    <div className={'row'}>
                        <label>All Products</label>
                        <table className="table">
                            <thead className="thead-light">
                            <tr>
                                <th scope="col">Product ID</th>
                                <th scope="col">Name</th>
                            </tr>
                            </thead>
                            <tbody>
                                { products.slice(0, lastCount).map( product =>
                                    <tr key={product.id}>
                                        <th scope="row">{product.id}</th>
                                        <td>{product.name}</td>
                                    </tr>
                                )}
                                <div className={'text-center'}>
                                    {lastCount < products.length ?
                                        (
                                            <button className={'btn btn-sm btn-info'} onClick={this.handleChangeLimit.bind(this, true)}>Show More <span className={'fa fa-arrow-down fa-1x'}></span> </button>
                                        )
                                        : null
                                    }
                                    <span>&nbsp;</span>
                                    {lastCount > 5 ?
                                    (
                                        <button className={'btn btn-sm btn-danger'} onClick={this.handleChangeLimit.bind(this, false)}>Show Less <span className={'fa fa-arrow-up fa-1x'}></span></button>
                                    ) : null}
                                </div>
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        )
    }
}
export default GetProducts;