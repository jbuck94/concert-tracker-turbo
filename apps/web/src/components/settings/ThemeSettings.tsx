import ThemeColorPresets from 'src/components/settings/ThemeColorPresets';

type Props = {
  children: React.ReactNode;
};

export default function ThemeSettings({ children }: Props) {
  return <ThemeColorPresets>{children}</ThemeColorPresets>;
}
