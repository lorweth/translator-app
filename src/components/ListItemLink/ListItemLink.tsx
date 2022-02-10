import { ListItem, ListItemIcon, ListItemText } from '@mui/material';
import React from 'react';
import { Link as RouterLink, LinkProps as RouterLinkProps } from 'react-router-dom';
import { capitalizeFirstLetter } from 'src/functions/string-utils';

interface ListItemLinkProps {
  icon?: React.ReactElement;
  primary: string;
  to: string;
}

function ListItemLink(props: ListItemLinkProps) {
  const { icon, primary, to } = props;

  const renderLink = React.useMemo(
    () =>
      React.forwardRef<HTMLAnchorElement, Omit<RouterLinkProps, 'to'>>(function Link(
        itemProps,
        ref
      ) {
        return <RouterLink to={to} ref={ref} {...itemProps} role={undefined} />;
      }),
    [to]
  );

  return (
    <li>
      <ListItem button component={renderLink}>
        {icon ? <ListItemIcon>{icon}</ListItemIcon> : null}
        <ListItemText primary={primary} />
      </ListItem>
    </li>
  );
}
export default ListItemLink;
