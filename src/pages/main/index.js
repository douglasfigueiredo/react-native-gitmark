import React, { Component } from 'react';
import Proptypes from 'prop-types';

import {
  SafeAreaView,
  View,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Creators as FavoriteActions } from 'store/ducks/favorites';

import styles from './styles';

class Main extends Component {
  static navigationOptions = {
    header: null,
  };

  static propTypes = {
    navigation: Proptypes.shape({
      navigate: Proptypes.func,
    }).isRequired,
    addFavoriteRequest: Proptypes.func.isRequired,
    favorites: Proptypes.shape({
      data: Proptypes.arrayOf(Proptypes.shape),
      errorOnAdd: Proptypes.oneOfType([null, Proptypes.string]),
      loading: Proptypes.bool,
    }).isRequired,
  }

  state = {
    repoNameInput: '',
  };

  navigateToFavorites = () => {
    const { navigation } = this.props;
    navigation.navigate('Favorites');
  }

  addRepository = () => {
    const { addFavoriteRequest } = this.props;
    const { repoNameInput } = this.state;
    if (!repoNameInput.length) return;

    addFavoriteRequest(repoNameInput);
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" />
        <View style={styles.content}>
          <Text style={styles.title}>Gitmark</Text>
          <Text style={styles.description}>
            Comece adicionando alguns repositórios aos seus favoritos.
          </Text>

          <View style={styles.form}>
            { !!this.props.favorites.errorOnAdd && (
              <Text style={styles.error}>{this.props.favorites.errorOnAdd}</Text>
            )}

            <TextInput
              style={styles.input}
              autoCapitalize="none"
              autoCorrect={false}
              placeholder="usuário/repositório"
              underlineColorAndroid="transparent"
              value={this.state.repoNameInput}
              onChangeText={repoNameInput => this.setState({ repoNameInput })}
            />

            <TouchableOpacity
              style={styles.button}
              onPress={this.addRepository}
              activeOpacity={0.6}
            >
              { this.props.favorites.loading ?
                <ActivityIndicator size="small" color="styles.loading.color" />
                : <Text style={styles.buttonText}>Adicionar aos favoritos</Text>}
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.footer}>
          <TouchableOpacity onPress={this.navigateToFavorites}>
            <Text style={styles.footerLink}>
              Meus favoritos (
              {this.props.favorites.data.length}
              )
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => ({
  favorites: state.favorites,
});

const mapDispatchToProps = dispatch => (
  bindActionCreators(FavoriteActions, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(Main);
