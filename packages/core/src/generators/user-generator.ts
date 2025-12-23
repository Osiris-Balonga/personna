import type {
  CreateUserOptions,
  GeneratedUser,
  AgeGroup,
  Gender,
  Ethnicity,
  AvatarStyle,
  FactoryConfig,
} from '../types';
import { DEFAULT_CONFIG, GENDERS } from '../types';
import { SeededRandom } from '../random';
import { DistributionResolver } from '../distribution';
import { inferEthnicityFromNationality } from '../mappings';
import { generateName } from '../names';
import { generateAge, computeBirthDateWithVariation } from './age-generator';
import { generateEmail } from './email-generator';
import { generateUsername } from './username-generator';
import { generatePhone } from './phone-generator';
import { generateAddress } from './address-generator';
import { AvatarPicker } from '../avatars';

// Default nationality if none provided
const DEFAULT_NATIONALITY = 'US';
const DEFAULT_AGE_GROUP: AgeGroup = 'adult';

export class UserGenerator {
  private resolver: DistributionResolver;
  private avatarPicker: AvatarPicker;
  private config: FactoryConfig;

  constructor(
    private random: SeededRandom,
    config: Partial<FactoryConfig> = {}
  ) {
    this.config = { ...DEFAULT_CONFIG, ...config };
    this.resolver = new DistributionResolver(random);
    this.avatarPicker = new AvatarPicker(this.config);
  }

  /**
   * Generate a single user
   */
  generate(options: CreateUserOptions = {}): GeneratedUser {
    // Step 1: Resolve distribution options to single values
    const gender = this.resolver.resolve<Gender>(
      options.gender,
      this.random.pick(GENDERS)
    );

    const nationality = this.resolver.resolve(
      options.nationality,
      DEFAULT_NATIONALITY
    );

    const ageGroup = this.resolver.resolve<AgeGroup>(
      options.ageGroup,
      DEFAULT_AGE_GROUP
    );

    const avatarStyle = this.resolver.resolve<AvatarStyle>(
      options.avatarStyle,
      this.config.defaultAvatarStyle
    );

    // Step 2: Infer ethnicity if not provided
    const ethnicity: Ethnicity = options.ethnicity
      ? this.resolver.resolve(options.ethnicity, 'mixed')
      : inferEthnicityFromNationality(nationality, this.random);

    // Step 3: Generate individual fields
    const id = this.random.uuid();
    const name = generateName(nationality, gender, this.random);
    const age = generateAge(ageGroup, this.random);
    const birthDate = computeBirthDateWithVariation(age, this.random);
    const email = generateEmail(name, this.random);
    const username = generateUsername(name, this.random);
    const phone = generatePhone(nationality, this.random);
    const address = generateAddress(nationality, this.random);
    const locale = this.getLocale(nationality);

    // Step 4: Generate avatar if requested
    const avatar =
      options.includeAvatar !== false
        ? this.avatarPicker.pick(
            { gender, ageGroup, ethnicity, style: avatarStyle },
            this.random
          )
        : undefined;

    // Step 5: Assemble and return
    return {
      id,
      name,
      gender,
      age,
      ageGroup,
      birthDate,
      nationality,
      ethnicity,
      email,
      username,
      phone,
      address,
      locale,
      avatar: avatar ?? undefined,
    };
  }

  /**
   * Get locale string from nationality
   */
  private getLocale(nationality: string): string {
    const localeMap: Record<string, string> = {
      US: 'en_US',
      GB: 'en_GB',
      UK: 'en_GB',
      FR: 'fr_FR',
      DE: 'de_DE',
      ES: 'es_ES',
      IT: 'it_IT',
      PT: 'pt_PT',
      BR: 'pt_BR',
      SN: 'fr_SN',
      CI: 'fr_CI',
      CG: 'fr_CG',
      CD: 'fr_CD',
      CM: 'fr_CM',
      MA: 'fr_MA',
      DZ: 'fr_DZ',
      TN: 'fr_TN',
      JP: 'ja_JP',
      CN: 'zh_CN',
      KR: 'ko_KR',
      IN: 'hi_IN',
      RU: 'ru_RU',
      AR: 'es_AR',
      MX: 'es_MX',
      CO: 'es_CO',
    };

    return localeMap[nationality.toUpperCase()] ?? `en_${nationality.toUpperCase()}`;
  }
}
