import React from 'react';
import { useTranslation } from 'react-i18next';

import { AnimationSlideUp } from '@/components/Animations';
import { Button } from '@/components/Button';
import { PageCard } from '@/components/PageCard';
import { PageWrapper } from '@/components/PageWrapper';
import { RadioGroup, RadioItem } from '@/components/Radio';

import { Header } from './Header';
import { Paragraph } from '../../components/Paragraph/Paragraph';

export const SettingsPage: React.FC = () => {
  const { t } = useTranslation('settings');

  const [language, setLanguage] = React.useState<string>(
    localStorage.getItem('rollnscore:lang') || 'pl',
  );

  const handleSwitchLanguage = (lang: string) => {
    setLanguage(lang);
    localStorage.setItem('rollnscore:lang', lang);
    window.location.reload();
  };

  const handleResetGame = () => {
    localStorage.removeItem('rs:currentGame');
    window.location.reload();
  };

  const handleResetHistory = () => {
    localStorage.removeItem('rs:history');
    window.location.reload();
  };

  return (
    <PageWrapper className="relative h-screen">
      <PageCard>
        <Header />
        <main className="mt-6 flex flex-col gap-6 md:gap-8">
          <AnimationSlideUp delay={0.2} duration={0.6}>
            <div className="flex flex-col justify-between border-2 border-gray p-3 rounded-md shadow-lg">
              <Paragraph size="small" className="mb-4">
                {t('change_language')}
              </Paragraph>
              <RadioGroup name="points-combination">
                <RadioItem
                  name="language"
                  value="pl"
                  label={t('polish')}
                  onCheckedChange={() => handleSwitchLanguage('pl')}
                  checked={language === 'pl'}
                />
                <RadioItem
                  name="language"
                  value="en"
                  label={t('english')}
                  onCheckedChange={() => handleSwitchLanguage('en')}
                  checked={language === 'en'}
                />
              </RadioGroup>
            </div>
          </AnimationSlideUp>
          <AnimationSlideUp delay={0.2} duration={0.6}>
            <div className="flex flex-col justify-between border-2 border-red-500 p-3 rounded-md shadow-lg">
              <Paragraph size="small" className="mb-2">
                {t('reset_game')}
              </Paragraph>
              <Button variant="danger" size="md" className="w-[200px]" onClick={handleResetGame}>
                Reset
              </Button>
            </div>
          </AnimationSlideUp>
          <AnimationSlideUp delay={0.4} duration={0.6}>
            <div className="flex flex-col justify-between border-2 border-red-500 p-3 rounded-md shadow-lg">
              <Paragraph size="small" className="mb-2">
                {t('reset_history')}
              </Paragraph>
              <Paragraph size="small" weight="semibold" className="mb-2 !text-red-500">
                {t('reset_history_subtitle')}
              </Paragraph>
              <Button variant="danger" size="md" className="w-[200px]" onClick={handleResetHistory}>
                Reset
              </Button>
            </div>
          </AnimationSlideUp>
        </main>
      </PageCard>
    </PageWrapper>
  );
};
