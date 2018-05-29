import React from 'react';
import { isEmpty } from 'ramda';

import ErrorPageContainer from '../ErrorPage/ErrorPageContainer';
import { TracksGridWrapper, Text } from '../TracksGrid/TracksGridStyles';
import { styles } from '../YourPlaylists/YourPlaylistsStyles';
import { TrackTile } from '../Tracks/TrackStyle';

const renderFavorite = ({ album: { artists, images }, name }, idx) => (
  <TrackTile key={`${name}-${idx}`} title={name} subtitle={<span>{artists[0].name}</span>}>
    <img alt="Album" src={images[0].url} />
  </TrackTile>
);

const renderFavorites = (favorites) => (
  <div>
    <TracksGridWrapper>
      <Text>
        <span role="img" aria-label="Fire">
          🔥
        </span>{' '}
        Favorites
      </Text>
      <div style={styles.grid} ref={this.setGridElementRef}>
        {favorites.map(renderFavorite)}
      </div>
    </TracksGridWrapper>
  </div>
);

const renderErrorPage = (noSavedFavoritesError) => (
  <ErrorPageContainer errorMsg={noSavedFavoritesError} />
);

const Favorites = ({ favorites, noSavedFavoritesError }) =>
  isEmpty(favorites) ? renderErrorPage(noSavedFavoritesError) : renderFavorites(favorites);

export default Favorites;