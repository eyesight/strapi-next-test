import type { Schema, Struct } from '@strapi/strapi';

export interface ContainerLeftRightContainer extends Struct.ComponentSchema {
  collectionName: 'components_container_left_right_containers';
  info: {
    description: '';
    displayName: 'left-Right-Container';
    icon: 'arrowLeft';
  };
  attributes: {
    leftColumnBg: Schema.Attribute.Component<'helper.background', false>;
    leftColumnKeyfigure: Schema.Attribute.Component<
      'text-blocks.key-figure',
      false
    >;
    leftColumnText: Schema.Attribute.Component<'text-blocks.text-image', false>;
    rightColumnBg: Schema.Attribute.Component<'helper.background', false>;
    rightColumnKeyfigure: Schema.Attribute.Component<
      'text-blocks.key-figure',
      false
    >;
    rightColumnText: Schema.Attribute.Component<
      'text-blocks.text-image',
      false
    >;
  };
}

export interface HelperBackground extends Struct.ComponentSchema {
  collectionName: 'components_helper_backgrounds';
  info: {
    displayName: 'background';
    icon: 'doctor';
  };
  attributes: {
    color: Schema.Attribute.Enumeration<['blue', 'red', 'yellow']> &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'blue'>;
  };
}

export interface SectionExample extends Struct.ComponentSchema {
  collectionName: 'components_section_examples';
  info: {
    displayName: 'example';
  };
  attributes: {
    test: Schema.Attribute.String;
  };
}

export interface TextBlocksKeyFigure extends Struct.ComponentSchema {
  collectionName: 'components_text_blocks_key_figures';
  info: {
    description: '';
    displayName: 'keyFigure';
    icon: 'cube';
  };
  attributes: {
    description: Schema.Attribute.String;
    number: Schema.Attribute.String & Schema.Attribute.Required;
    text: Schema.Attribute.String;
  };
}

export interface TextBlocksTextImage extends Struct.ComponentSchema {
  collectionName: 'components_text_blocks_text_images';
  info: {
    description: '';
    displayName: 'text-image';
    icon: 'apps';
  };
  attributes: {
    image: Schema.Attribute.Media<'images' | 'videos'>;
    text: Schema.Attribute.Blocks & Schema.Attribute.Required;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'container.left-right-container': ContainerLeftRightContainer;
      'helper.background': HelperBackground;
      'section.example': SectionExample;
      'text-blocks.key-figure': TextBlocksKeyFigure;
      'text-blocks.text-image': TextBlocksTextImage;
    }
  }
}
