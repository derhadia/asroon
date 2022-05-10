import React from "react";
import axios from 'axios';

const withDataFetching = props => WrappedComponent => {
    class WithDataFetching extends React.Component {
        constructor() {
            super();
            this.state = {
                results: [],
                loading: true,
                error: ""
            };
        }
        async fetchData() {
            try {
                await axios(props.dataSource)
                    .then(res => {
                        if (res) {
                            this.setState({
                                results: res.data,
                                loading: false
                            });
                        }
                    })
            } catch (error) {
                this.setState({
                    loading: false,
                    error: error.message
                });
            }
        }

        componentDidMount() {
            this.fetchData();
        }

        render() {
            const { results, loading, error } = this.state;

            return (
                <WrappedComponent
                    results={results}
                    loading={loading}
                    error={error}
                    {...this.props}
                    onClick={() => this.fetchData()}
                />
            );
        }
    }
    WithDataFetching.displayName = `WithDataFetching(${WrappedComponent.name})`;

    return WithDataFetching;
};

export default withDataFetching;
