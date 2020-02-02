import React from 'react';
import styles from './index.less';
import 'swiper/css/swiper.css';
import Swiper from 'react-id-swiper';

class Index extends React.PureComponent {
  state = {
    active: 0,
    keyword: '',
    swiper: null,
  };
  gallerySwiperParams = {};

  constructor(...args) {
    super(args);
    let { active, onChange } = args[0];
    console.log('props', args, active, onChange);

    this.gallerySwiperParams = {
      slidesPerView: 1,
      centeredSlides: true,
      activeSlideKey: `${active}`,
      getSwiper: obj => {
        if (this.state && !this.state.swiper) {
          this.setState({
            swiper: obj,
          });
        }
      },
      on: {
        slideChange: () => {
          if (this.state && this.state.swiper) {
            let active = this.state.swiper.realIndex;
            if (onChange) {
              onChange(active);
            }
          }
        },
      },
    };
  }

  render() {
    let { images, onChange } = this.props;

    return (<div className={styles.component}>
      <div className={styles.gallery}>
        <Swiper {...this.gallerySwiperParams}>
          {images.map((item, index) => (<img key={`${index}`} src={item} alt=""/>))}
        </Swiper>
      </div>
    </div>);
  }

}

export default Index;