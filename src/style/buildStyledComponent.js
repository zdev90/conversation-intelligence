import { isEmpty } from 'lodash';

import {
  applyStyleModifiers,
  styleModifierPropTypes,
} from 'styled-components-modifiers';

function isStyledComponent(target) {
  return (
    typeof target === 'function' && typeof target.styledComponentId === 'string'
  );
}

export function buildStyledComponent(
  displayName,
  builderFn,
  styles = '',
  {
    defaultProps = {},
    modifierConfig = {},
    propTypes = {}, // eslint-disable-line react/forbid-foreign-prop-types
    className = '',
  } = {}
) {
  // If the builderFn is a styled component, the developer is attempting
  // to extend a previously built styled component. These components get
  // some special treatment
  const isBuilderFnStyledComponent = isStyledComponent(builderFn);

  // A previously built styled component should be extended instead of
  // creating a completely new component.
  const finalBuilderFn = isBuilderFnStyledComponent
    ? builderFn.extend
    : builderFn;

  // Also, if the devoloper is using a styled component, merge the modifiers
  // from the parent with the modifierConfig specified for this component. This
  // allows the developer to use both without throwing errors.
  const finalModifierConfig =
    isBuilderFnStyledComponent && typeof builderFn.modifiers === 'object'
      ? {
          ...builderFn.modifiers,
          ...modifierConfig,
        }
      : modifierConfig;

  const component = finalBuilderFn`
    ${styles}
    ${applyStyleModifiers(finalModifierConfig)}
  `;

  const finalPropTypes = { ...propTypes };

  if (!isEmpty(finalModifierConfig)) {
    finalPropTypes.modifiers = styleModifierPropTypes(finalModifierConfig);
  }

  const { className: classNameProp, ...otherDefaultProps } = defaultProps;
  component.defaultProps = {
    className: className || classNameProp || displayName,
    ...otherDefaultProps,
  };

  component.displayName = displayName;
  component.modifiers = finalModifierConfig;
  component.propTypes = finalPropTypes;

  return component;
}
