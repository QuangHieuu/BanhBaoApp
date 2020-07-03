import React, {Component} from 'react';
import {
  FlatList,
  View,
  StyleSheet,
  ActivityIndicator,
  Platform,
  ScrollView,
  RefreshControl,
} from 'react-native';
import PropTypes from 'prop-types';
import {request} from '../api/api/ApiConfig';
import {showError} from '../api/api/ErrorHandler';
import {APP_COLOR} from '../../res/styles/AppStyles';
import Sizes from '../../res/styles/Sizes';

const _INITIAL_PAGE = 0;
const _LIMIT_ITEM = 10;

class FetchableList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      firstLoad: true,
      reachedEnd: false,
      refreshing: false,
      page: _INITIAL_PAGE,
      items: [],
      endpoint: this.props.endpoint,
    };
  }

  static getDerivedStateFromProps(props, state) {
    if (props.endpoint !== state.endpoint) {
      return {
        loading: false,
        reachedEnd: false,
        refreshing: false,
        page: _INITIAL_PAGE,
        endpoint: props.endpoint,
      };
    }
    return null;
  }

  componentDidUpdate(prevProps, prevState) {
    if (!prevState.firstLoad && prevState.endpoint !== this.state.endpoint) {
      this.reload();
    }
  }

  updateItem = (keyName, keyValue, newItem) => {
    const {items} = this.state;
    this.setState({
      items: items.map((item) => {
        if (item[keyName] === keyValue) {
          return {...item, ...newItem};
        }
        return item;
      }),
    });
  };

  componentDidMount() {
    this._fetchFirstTime();
  }

  _getItems = (data, page) => {
    const {exceptPage} = this.props;
    if (exceptPage && exceptPage[page]) {
      const dataPath = exceptPage[page].dataPath;
      if (!dataPath) {
        return data;
      }
      const paths = dataPath.split('.');
      paths.forEach((path) => {
        data = data[path];
      });
      return data;
    }
    const {dataPath} = this.props;
    if (!dataPath) {
      return data;
    }
    const paths = dataPath.split('.');
    paths.forEach((path) => {
      data = data[path];
    });
    return data;
  };

  _getEndpoint = (page) => {
    if (this.props.loadMoreEnable) {
      const {exceptPage} = this.props;
      if (exceptPage && exceptPage[page]) {
        return exceptPage[page].url;
      }
      return this.state.endpoint.replace('${page}', page);
    }
    return this.state.endpoint;
  };

  _fetchFirstTime = () => {
    this.setState({
      loading: true,
    });
    const page = _INITIAL_PAGE + 1;
    const endpoint = this._getEndpoint(page);
    request({endpoint})
      .then((data) => {
        this._handleFetchData(data, page);
      })
      .catch((error) => {
        showError(error);
        this.setState({
          loading: false,
          firstLoad: false,
        });
      });
  };

  _handleFetchData = (data, page) => {
    const items = this._getItems(data, page);
    if (items && items.length !== 0) {
      const limitItem = this.props.limitItem;
      if (items.length < limitItem) {
        this.setState({
          items: [...this.state.items, ...items],
          reachedEnd: true,
          loading: false,
          firstLoad: false,
          page,
        });
      } else {
        this.setState({
          items: [...this.state.items, ...items],
          loading: false,
          firstLoad: false,
          page,
        });
      }
    } else {
      this.setState({
        loading: false,
        reachedEnd: true,
        firstLoad: false,
        page,
      });
    }
    const {onLoad} = this.props;
    if (onLoad) {
      onLoad(data, page);
    }
  };

  _fetchPage = (page) => {
    this.setState({
      loading: true,
    });
    const endpoint = this._getEndpoint(page);
    request({endpoint})
      .then((data) => {
        this._handleFetchData(data, page);
      })
      .catch((error) => {
        showError(error);
        this.setState({
          loading: false,
        });
      });
  };

  refresh = () => {
    this.setState({
      refreshing: true,
      loading: true,
      reachedEnd: false,
    });

    const page = _INITIAL_PAGE + 1;
    const endpoint = this._getEndpoint(page);
    request({endpoint})
      .then((data) => {
        const items = this._getItems(data, page);
        if (items.length !== 0) {
          this.setState({
            items: items,
            loading: false,
            page: page,
            refreshing: false,
          });
        } else {
          this.setState({
            items: [],
            loading: false,
            reachedEnd: true,
            page: page,
            refreshing: false,
          });
        }
        const {onLoad} = this.props;
        if (onLoad) {
          onLoad(data, page);
        }
      })
      .catch((error) => {
        showError(error);
        this.setState({
          loading: false,
          refreshing: false,
        });
      });
    const {onRefresh} = this.props;
    if (onRefresh) {
      onRefresh();
    }
  };

  reload = () => {
    this.setState({
      loading: true,
      reachedEnd: false,
    });

    const page = _INITIAL_PAGE + 1;
    const endpoint = this._getEndpoint(page);
    request({endpoint})
      .then((data) => {
        const items = this._getItems(data, page);
        if (items.length !== 0) {
          this.setState({
            items: items,
            loading: false,
            page: page,
          });
        } else {
          this.setState({
            loading: false,
            reachedEnd: true,
            page: page,
            items: [],
          });
        }
        const {onLoad} = this.props;
        if (onLoad) {
          onLoad(data, page);
        }
      })
      .catch((error) => {
        showError(error);
        this.setState({
          loading: false,
        });
      });
  };

  _onRefresh = () => {
    const {refreshEnable} = this.props;
    if (!refreshEnable) {
      return;
    }
    const {refreshing} = this.state;
    if (!refreshing) {
      this.refresh();
    }
  };

  _onEndReached = () => {
    const {loadMoreEnable} = this.props;
    if (!loadMoreEnable) {
      return;
    }
    const {loading, reachedEnd} = this.state;
    if (!reachedEnd && !loading) {
      this._fetchPage(this.state.page + 1);
    }
  };

  _renderFooterComponent = () => {
    const {loading, firstLoad, refreshing} = this.state;
    if (loading && !firstLoad && !refreshing) {
      const size = Platform.OS === 'ios' ? 'large' : Sizes.width30;
      return (
        <ActivityIndicator
          style={styles.indicator}
          animating={true}
          size={size}
          color={APP_COLOR.PRIMARY}
        />
      );
    }
  };

  render() {
    const {
      numColumns,
      getItemLayout,
      initialNumToRender,
      stickyHeaderIndices,
      EmptyComponent,
      HeaderComponent,
      keyExtractor,
      renderItem,
      renderSeparator,
    } = this.props;
    const {refreshEnable, loadMoreEnable} = this.props;
    const refreshing = refreshEnable ? this.state.refreshing : null;
    const onRefresh = refreshEnable ? this._onRefresh : null;
    const onEndReached = loadMoreEnable ? this._onEndReached : null;
    const onEndReachedThreshold = loadMoreEnable
      ? this.props.onEndReachedThreshold || 0.2
      : null;
    if (this.state.firstLoad) {
      const size = Platform.OS === 'ios' ? 'large' : Sizes.width34;
      return (
        <View style={styles.firstLoadWrapper}>
          <ActivityIndicator animating={true} size={size} color={APP_COLOR} />
        </View>
      );
    }

    if (this.state.items.length === 0 && EmptyComponent) {
      return (
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          contentContainerStyle={styles.container}>
          {HeaderComponent}
          {EmptyComponent}
        </ScrollView>
      );
    }

    return (
      <FlatList
        {...this.props}
        stickyHeaderIndices={stickyHeaderIndices}
        numColumns={numColumns}
        ListHeaderComponent={HeaderComponent}
        data={this.state.items}
        getItemLayout={getItemLayout}
        initialNumToRender={initialNumToRender}
        refreshing={refreshing}
        scrollEnabled={this.props.scrollEnabled}
        ItemSeparatorComponent={renderSeparator}
        onRefresh={onRefresh}
        onEndReached={onEndReached}
        onEndReachedThreshold={onEndReachedThreshold || 0}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        ListFooterComponent={this._renderFooterComponent()}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  firstLoadWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  indicator: {
    marginVertical: 4,
  },
});

FetchableList.defaultProps = {
  refreshEnable: true,
  loadMoreEnable: true,
  scrollEnabled: true,
  limitItem: _LIMIT_ITEM,
};

FetchableList.propTypes = {
  numColumns: PropTypes.number,
  endpoint: PropTypes.string.isRequired,
  renderSeparator: PropTypes.func,
  refreshEnable: PropTypes.bool,
  keyExtractor: PropTypes.func,
  renderItem: PropTypes.func,
  onEndReachedThreshold: PropTypes.number,
  loadMoreEnable: PropTypes.bool,
  EmptyComponent: PropTypes.element,
  HeaderComponent: PropTypes.element,
  dataPath: PropTypes.string,
  onLoad: PropTypes.func,
  onRefresh: PropTypes.func,
  exceptPage: PropTypes.object,
  limitItem: PropTypes.number,
};

export default FetchableList;
