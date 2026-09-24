import Button from '@app/components/Common/Button';
import Dropdown from '@app/components/Common/Dropdown';
import defineMessages from '@app/utils/defineMessages';
import { ChevronDownIcon } from '@heroicons/react/24/solid';
import { useState } from 'react';
import { useIntl } from 'react-intl';

const messages = defineMessages('components.ExternalSearch', {
  search: 'Search',
});

const EXTERNAL_SEARCH_SITES = [
  {
    name: 'Loadix',
    buildUrl: (query: string) => `https://loadix.fun/search?q=${query}`,
  },
  {
    name: 'Movix',
    buildUrl: (query: string) => `https://movix.cash/search?q=${query}`,
  },
] as const;

interface ExternalSearchProps {
  title: string;
  fullWidth?: boolean;
}

const ExternalSearch = ({ title, fullWidth = false }: ExternalSearchProps) => {
  const intl = useIntl();
  const [open, setOpen] = useState(false);
  const query = encodeURIComponent(title.toLowerCase());

  if (fullWidth) {
    return (
      <div className="w-full space-y-2">
        <Button
          className="w-full"
          buttonType="primary"
          onClick={() => setOpen((current) => !current)}
          aria-expanded={open}
        >
          <ChevronDownIcon className={open ? 'rotate-180' : ''} />
          <span>{intl.formatMessage(messages.search)}</span>
        </Button>
        {open &&
          EXTERNAL_SEARCH_SITES.map((site) => (
            <Button
              key={site.name}
              as="a"
              href={site.buildUrl(query)}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full"
              buttonType="ghost"
            >
              <span>{site.name}</span>
            </Button>
          ))}
      </div>
    );
  }

  return (
    <Dropdown text={intl.formatMessage(messages.search)} className="ml-2">
      {EXTERNAL_SEARCH_SITES.map((site) => (
        <Dropdown.Item
          key={site.name}
          href={site.buildUrl(query)}
          target="_blank"
          rel="noopener noreferrer"
        >
          {site.name}
        </Dropdown.Item>
      ))}
    </Dropdown>
  );
};

export default ExternalSearch;
