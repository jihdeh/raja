import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {
  connectRange,
} from 'react-instantsearch-native';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import {
  View,
  Text,
} from 'react-native';

class Range extends Component {
  static propTypes = {
    min: PropTypes.number,
    max: PropTypes.number,
    currentRefinement: PropTypes.object,
    refine: PropTypes.func.isRequired,
    canRefine: PropTypes.bool.isRequired
  };

  state = { currentValues: { min: this.props.min, max: this.props.max } };

  componentWillReceiveProps(sliderState) {
    if (sliderState.canRefine) {
      this.setState({
        currentValues: {
          min: sliderState.currentRefinement.min,
          max: sliderState.currentRefinement.max
        }
      });
    }
  }

  onValuesChange = sliderState => {
    if (
      this.props.currentRefinement.min !== sliderState[0] ||
      this.props.currentRefinement.max !== sliderState[1]
    ) {
      this.props.refine({
        min: sliderState[0],
        max: sliderState[1]
      });
      this.setState({ currentValues: { min: sliderState[0], max: sliderState[1] } })
    }
  };

  render() {
    const { min, max, currentRefinement } = this.props;
    const { currentValues } = this.state;

    return min !== max
      ? <View style={{flex: 1, alignItems: 'stretch', justifyContent: 'center'}}>
            <Text>Price Range</Text>
          <Text>{currentValues.min} - {currentValues.max}</Text>
          <MultiSlider
            values={[currentRefinement.min, currentRefinement.max]}
            onValuesChange={this.onValuesChange}
            min={min}
            max={max}
            step={1}
            allowOverlap
            snap
          />
        </View>
      : null;
  }
}

const RangeSlider = connectRange(Range);
export default RangeSlider;
