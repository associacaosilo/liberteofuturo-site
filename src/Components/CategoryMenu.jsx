import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import catImages from '../data/categoryimages';

class CategoryMenu extends Component {
  state = {};
  render() {
    const { toggleCategoryMenu, categories, lang } = this.props;
    return (
      <div className="categorymenu" onClick={toggleCategoryMenu}>
        <div className="categorymenu_close" onClick={toggleCategoryMenu}>
          <i className="fa fa-times"></i>
        </div>
        <div className="categorymenu_wrapper">
          <ul>
            {categories.map((category, index) => {
              return (
                <li key={category.slug}>
                  <Link
                    to={`/category/${category.slug}`}
                    onClick={toggleCategoryMenu}
                  >
                    <img src={catImages[category.slug].url} alt="" />
                    <h3>
                      <span>0{index + 1}</span>
                      {category[lang].titulo}
                    </h3>
                    <p>{category[lang].subtitulo}</p>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    );
  }
}

export default CategoryMenu;
