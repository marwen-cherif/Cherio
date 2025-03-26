import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from '@mantine/form';
import {
  TextInput,
  PasswordInput,
  Button,
  Container,
  Title,
  Paper,
  Text,
  Divider,
  Group,
  Anchor,
  Stack,
} from '@mantine/core';
import { useAuth } from '../contexts/AuthContext';

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm({
    initialValues: {
      email: '',
      password: '',
    },
    validate: {
      email: (value) => (/^\S+@\S+\.\S+$/.test(value) ? null : 'Email invalide'),
      password: (value) => (value.length < 6 ? 'Le mot de passe doit comporter au moins 6 caractères' : null),
    },
  });

  const handleSubmit = async (values: { email: string; password: string }) => {
    setIsLoading(true);
    setError(null);

    try {
      await login(values.email, values.password);
      navigate('/');
    } catch (error) {
      console.error('Erreur de connexion:', error);
      setError('Email ou mot de passe incorrect');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container size="xs" py="xl">
      <Paper withBorder shadow="md" p={30} radius="md" mt="xl">
        <Title order={2} ta="center" mb="md">
          Connexion à SyndicCheck
        </Title>

        {error && (
          <Text color="red" ta="center" mb="md">
            {error}
          </Text>
        )}

        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Stack>
            <TextInput
              label="Email"
              placeholder="votre@email.com"
              required
              {...form.getInputProps('email')}
            />

            <PasswordInput
              label="Mot de passe"
              placeholder="Votre mot de passe"
              required
              {...form.getInputProps('password')}
            />

            <Button type="submit" fullWidth loading={isLoading}>
              Se connecter
            </Button>
          </Stack>
        </form>

        <Divider label="Ou" labelPosition="center" my="lg" />

        <Group justify="center" mt="md">
          <Text fz="sm">
            Pas encore de compte?{' '}
            <Anchor component={Link} to="/register" fw={700}>
              S'inscrire
            </Anchor>
          </Text>
        </Group>
      </Paper>
    </Container>
  );
}