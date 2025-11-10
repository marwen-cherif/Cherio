import { useState } from 'react';
import {
  AppShell,
  Burger,
  Group,
  NavLink,
  useMantineTheme,
  Title,
  rem,
  Text,
  Button,
  Avatar,
  Box,
  Divider,
} from '@mantine/core';
import {
  IconHome,
  IconFileInvoice,
  IconFileDescription,
  IconUsers,
  IconSettings,
  IconLogout,
} from '@tabler/icons-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

interface NavItem {
  label: string;
  icon: React.ReactNode;
  path: string;
  requiredRole?: string;
}

export default function AppSidebar({ children }: { children: React.ReactNode }) {
  const [opened, setOpened] = useState(false);
  useMantineTheme(); // Keep for potential future use
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();

  const mainNavItems: NavItem[] = [
    {
      label: 'Accueil',
      icon: <IconHome style={{ width: rem(20), height: rem(20) }} />,
      path: '/',
    },
    {
      label: 'Factures',
      icon: <IconFileInvoice style={{ width: rem(20), height: rem(20) }} />,
      path: '/bills',
    },
    {
      label: 'Contrats',
      icon: <IconFileDescription style={{ width: rem(20), height: rem(20) }} />,
      path: '/contracts',
    },
  ];

  const secondaryNavItems: NavItem[] = [
    {
      label: 'Utilisateurs',
      icon: <IconUsers style={{ width: rem(20), height: rem(20) }} />,
      path: '/users',
      requiredRole: 'admin',
    },
    {
      label: 'Paramètres',
      icon: <IconSettings style={{ width: rem(20), height: rem(20) }} />,
      path: '/settings',
    },
  ];

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const renderNavItems = (items: NavItem[]) => {
    return items
      .filter((item) => !item.requiredRole || user?.role === item.requiredRole)
      .map((item) => (
        <NavLink
          key={item.path}
          label={item.label}
          leftSection={item.icon}
          active={location.pathname === item.path}
          onClick={() => {
            navigate(item.path);
            setOpened(false);
          }}
          style={{ marginBottom: rem(5) }}
        />
      ));
  };

  // Generate initials from user's name
  const getUserInitials = () => {
    if (!user) return '?';

    const firstName = user.firstName || '';
    const lastName = user.lastName || '';

    if (firstName && lastName) {
      return `${firstName.charAt(0)}${lastName.charAt(0)}`;
    } else if (firstName) {
      return firstName.charAt(0);
    } else if (lastName) {
      return lastName.charAt(0);
    } else {
      return user.email.charAt(0).toUpperCase();
    }
  };

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: 'sm',
        collapsed: { mobile: !opened },
      }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md" justify="space-between">
          <Group>
            <Burger opened={opened} onClick={() => setOpened(!opened)} hiddenFrom="sm" size="sm" />
            <Title order={3}>Cherio - Backoffice</Title>
          </Group>
        </Group>
      </AppShell.Header>

      <AppShell.Navbar p="md">
        <AppShell.Section>
          {/* User profile section */}
          <Box mb="md">
            <Group>
              <Avatar color="blue" radius="xl">
                {getUserInitials()}
              </Avatar>
              <Box style={{ flex: 1 }}>
                <Text fw={500} size="sm" truncate>
                  {user?.firstName} {user?.lastName}
                </Text>
                <Text size="xs" c="dimmed" truncate>
                  {user?.email}
                </Text>
              </Box>
            </Group>
          </Box>
          <Divider mb="md" />
        </AppShell.Section>

        <AppShell.Section grow>{renderNavItems(mainNavItems)}</AppShell.Section>

        <AppShell.Section>
          {renderNavItems(secondaryNavItems)}
          <Divider my="sm" />
          <Button
            variant="subtle"
            color="red"
            fullWidth
            leftSection={<IconLogout style={{ width: rem(20), height: rem(20) }} />}
            onClick={handleLogout}
          >
            Déconnexion
          </Button>
        </AppShell.Section>
      </AppShell.Navbar>

      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
}
