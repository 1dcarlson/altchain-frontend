import { useTranslation } from 'react-i18next';
import ContactForm from '../components/ContactForm';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ScrollProgressIndicator from '../components/ScrollProgressIndicator';

export default function ContactPage() {
  const { t } = useTranslation();
  
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900">
      <ScrollProgressIndicator />
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white mb-4">
            {t('contact.pageTitle')}
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            {t('contact.pageDescription')}
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div className="space-y-8 bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-100 dark:border-gray-700">
            <div>
              <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-3">{t('contact.office')}</h3>
              <address className="not-italic text-gray-700 dark:text-gray-300">
                {t('contact.companyName') || "AltChain Inc."}<br />
                {t('contact.companyLocation') || "Phoenix, AZ"}<br />
                {t('contact.companyCountry') || "United States"}
              </address>
            </div>
            
            <div>
              <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-3">{t('contact.email')}</h3>
              <p><a href="mailto:daniel@altchain.app" className="text-primary hover:underline">{t('contact.companyEmailAddress') || "daniel@altchain.app"}</a></p>
            </div>
            
            <div>
              <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-3">{t('contact.hours')}</h3>
              <p className="text-gray-700 dark:text-gray-300">{t('contact.businessHours')}</p>
            </div>
          </div>
          
          <div className="rounded-xl overflow-hidden">
            <ContactForm />
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}