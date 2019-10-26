export class ConfigList {
    Id: string;
    List: ConfigMember[];
}

export class ConfigMember {
    Value: string;
    Text: string;
    Parent: string;
}
